import { Meteor } from 'meteor/meteor';

import './controllers/index.js'
import './publications/index.js'
import './daos/index.js'
import './models/index.js'
import Mail from "./libs/Mail";

Meteor.startup(() => {
    Mail.startSMTPServer()
});