package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
)

type GoLinkResp struct {
	ShortLink string `json:"shortLink"`
	LongLink  string `json:"longLink"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func FindRedirect(shortName string) string {
	var apiLink = fmt.Sprintf("http://api:3000/api/v1/links/%s", shortName)
	resp, err := http.Get(apiLink)
	if err != nil {
		panic(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	var link = new(GoLinkResp)
	err = json.Unmarshal(body, &link)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	return link.LongLink
}

func RedirectGoLink(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var redirect = FindRedirect(vars["id"])
	http.Redirect(w, r, redirect, http.StatusSeeOther)
	log.Printf("Redirect sent for %s", vars["id"])
}

func main() {
	log.Print("Starting go in go...")
	log.Print("Started and listening on 8000")
	router := mux.NewRouter()
	router.HandleFunc("/go/{id}", RedirectGoLink)
	log.Fatal(http.ListenAndServe(":8000", router))
}
