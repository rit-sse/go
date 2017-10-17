package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/streadway/amqp"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

type GoLinkResp struct {
	ShortLink string `json:"shortLink"`
	LongLink  string `json:"longLink"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

func FindRedirect(shortName string) string {
	// TODO: Not reload this every time.
	var apiHost = os.Getenv("API")
	var apiLink = fmt.Sprintf("%s/api/v2/links/%s", apiHost, shortName)
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr}
	resp, err := client.Get(apiLink)
	failOnError(err, "Failed to contact node-api")

	body, err := ioutil.ReadAll(resp.Body)
	var link = new(GoLinkResp)
	err = json.Unmarshal(body, &link)
	defer resp.Body.Close()

	return link.LongLink
}

func RedirectGoLink(w http.ResponseWriter, r *http.Request, stats chan string) {
	vars := mux.Vars(r)
	var redirect = FindRedirect(vars["id"])
	http.Redirect(w, r, redirect, http.StatusSeeOther)
	log.Printf("Redirect sent for %s to %s", vars["id"], redirect)
	stats <- vars["id"]
}

/**
 * Main collection loop, currently gives a channel that eats strings that are
 * the go links hit. Then sends them of to rabbit for processing else where.
 */
func collectionRoutine() chan string {
	// incoming information
	stats := make(chan string)

	time.Sleep(time.Second * 10)

	conn, err := amqp.Dial("amqp://alpine:alpine@rabbit:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"hits", // name
		true,   // durable
		false,  // delete when unused
		false,  // exclusive
		true,   // no-wait
		nil,    // arguments
	)
	failOnError(err, "Failed to declare a queue")

	go func() {
		for {
			msg := <-stats
			err = ch.Publish(
				"",     // exchange
				q.Name, // routing key
				false,  // mandatory
				false,  // immediate
				amqp.Publishing{
					ContentType: "text/plain",
					Body:        []byte(msg),
				})
		}
	}()

	defer conn.Close()
	return stats
}

func main() {
	log.Print("Starting go in go...")
	log.Printf("Upstream api at: %s", os.Getenv("API"))

	// Stats listener
	stats := collectionRoutine()
	stats <- "Hello"

	router := mux.NewRouter()
	router.HandleFunc("/go/{id}", func(w http.ResponseWriter, r *http.Request) {
		RedirectGoLink(w, r, stats)
	})

	// Start
	log.Print("Started and listening on 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
