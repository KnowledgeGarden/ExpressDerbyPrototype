# Tests #
This system is being crafted by testing. Each test here is first created to validate code generated, but in some cases, it is used to create the code in the first place.

One intention of these tests is to document how elements of the platform's APIs are used.

## proxytest.js ##
Used to validate the properties fields, and the toJSON API

## authenticationtest.js ##
Will be used to test the user database and authentication code

## proxysavetest.js ##
Used to test the entire MongoDB architecture, first with mongojs, possibly migrating to a topic map API instead of MongoDB.