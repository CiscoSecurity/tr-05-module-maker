[![Gitter Chat](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/CiscoSecurity/Threat-Response "Gitter Chat")
[![Travis CI Build Status](https://travis-ci.com/CiscoSecurity/tr-05-module-maker.svg?branch=develop)](https://travis-ci.com/CiscoSecurity/tr-05-module-maker)

# Threat Response Module Maker

## Context

Threat Response is a module-based product. Each module type represents an integration of Threat Response with a 3-rd party product. Modules types are represented by module tiles in the Threat Response UI. Module tiles look like cards and contain a description of a module type and help create an instance of a specific module type. In order to create a module tile a user has to create its json and populate it with the required information for the module type to be created and visible in the Threat Response UI.  

## Value

Module Maker facilitates and accelerates the process of managing (creating, editing, saving and uploading) Threat Response module type jsons. Users will not have to manage module type jsons manually. 

## Description

Module Maker, a GitHub pages app, written in react.js that allows a user to manage Threat Response module type jsons.

## Usage

The Sidebar panel contains 5 main features available to the user.
There are calls to action like: "Open JSON from File", "Open JSON from TR API", "Save JSON", "Push JSON to TR", "Create Patch".
Please note that to use most of them, you will be prompted to enter your credentials, namely:
```
client_id="client-[id copied from Add New Client form]"
client_password="[password copied from Add New Client form]"
```
To create them, please follow this [instruction](https://securex.us.security.cisco.com/help/integration#api-clients).
And once you have generated credentials, you can start working on your module type. Let's take a closer look at each of the features that will help you with this.

## Open JSON from File

User can upload a json into Module Maker from the local file and have the corresponding fields pre-populated.
## Open JSON from TR API

User can upload a json into Module Maker from the Threat Response API and have the corresponding fields pre-populated.
## Save JSON

If you have already filled in the desired fields of your module type, you can use Save JSON functionality.
Then the module type you created will be saved with the name `<Title>_module_type.json`.
Please note that if the required fields are not filled in, such a json is considered invalid and will not be saved.

## Push JSON to TR
If you have already filled in the desired fields of your module type, you can use Push JSON to TR functionality.
Please note that if the required fields are not filled in, such a json is considered invalid and will not be saved.

## Create Patch
User can pull the module type from corresponding region by ID and make desired changes. After that,
save these changes as a patch JSON file with the name `<Title>_module_type_patch.json`.
