'use strict';

import React from 'react';
import flux from './flux';

import GoApp from './components/app';

React.render(<GoApp flux={flux} />, document.getElementById('app'));
