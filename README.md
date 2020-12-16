[![Gitter Chat](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/CiscoSecurity/Threat-Response "Gitter Chat")
[![Travis CI Build Status](https://travis-ci.com/CiscoSecurity/tr-05-module-maker.svg?branch=develop)](https://travis-ci.com/CiscoSecurity/tr-05-module-maker)

# SecureX Threat Response Module Maker

[Module Maker](https://ciscosecurity.github.io/tr-05-module-maker/) is a React.js app deployed on GitHub 
Pages that allows a user to manage SecureX Threat Response Module Type JSONs.

## Rationale

SecureX Threat Response is a module-based product. Each Module Type represents an integration of SecureX Threat Response with a 3-rd party product.
Modules Types are represented by Module Tiles in the SecureX Threat Response UI. Module Tiles look like cards and contain
a description of a Module Type and help create an instance of a specific Module Type.
You have to create Module Type JSON and populate it with
the required information for the Module Type to be created and visible in the SecureX Threat Response UI.  
Module Maker facilitates and accelerates the process of managing (creating, editing, saving and uploading)
SecureX Threat Response Module Type JSONs. You do not have to manage Module Type JSONs manually and are able to edit markdown conveniently.
You do not have to convert the logo to the base64 format as Module Maker does it for you.


## Usage

The Sidebar panel contains 5 main features available to the user: **Open JSON from File**,
**Open JSON from TR API**, **Save JSON**, **Push JSON to TR** and **Create Patch JSON**. Please, note
that to use most of them you will be prompted to enter your credentials, namely:
```
client_id="client-[id copied from Add New Client form]"
client_password="[password copied from Add New Client form]"
```
Please, follow this [instruction](https://securex.us.security.cisco.com/help/integration#api-clients) to create them.
Once you have generated credentials, you can start working on your Module Type.

## Open JSON from File

Use the **Open JSON from File** feature to upload the JSON into Module Maker
from a local file and have the corresponding fields pre-populated.  
A supported file format for opening is `*.json`. 
The file will not be opened if it does not contain a valid Module Type JSON.
If you want to know what a valid one should look like, you can look at the example
value in [SecureX Threat Response API](https://visibility.amp.cisco.com/iroh/iroh-int/index.html#/ModuleType/post_iroh_iroh_int_module_type).

## Open JSON from TR API

Another option to obtain Module Type fields pre-populated in Module Maker is to pull
the JSON from the SecureX Threat Response API. To do this, click **Open JSON from TR API**. 
You will be prompted to enter your `Client ID` and `Client Password`,
as mentioned earlier and the `Module Type ID` you want to pull.
Also, don't forget to select the region where your organization was created.

## Save JSON

If you have already filled in the desired fields of your Module Type, you can use the **Save JSON** feature.
Then the Module Type you created will be saved with the name `<Title>_module_type.json` locally.
Please note that if the required fields are not filled in, such a JSON is considered invalid and will not be saved.

## Push JSON to TR
Besides saving the Module Type JSON locally, you can also push it to SecureX Threat Response
to be created and visible in the SecureX Threat Response UI.
Fill in the required fields, click **Push JSON to TR**, enter your credentials and choose the region.
Upon successful creation, you will receive confirmation with the `Module Type ID` you created,
and it will be visible in the SecureX Threat Response UI.
Further, we will consider in more detail which fields of the Module Type
are displayed on the SecureX Threat Response UI and which are important for functioning of a module instance.

## Create Patch JSON

To start a patch creation flow you can click **Create Patch** to pull the Module Type
from the corresponding region by ID and make the desired changes.
After that, click **Save Patch** on the Sidebar to save these changes
locally as a patch JSON file with the name `<Title>_module_type_patch.json`.

## Module Type UI Rendering

On the [Available Integration Modules](https://securex.us.security.cisco.com/integrations/available) page you 
can find a list of the available modules presented as Module Tiles. 
Take a look at one such Module Tile in the picture below. 

![Screenshot 2020-12-10 at 17 06 54](https://user-images.githubusercontent.com/75419441/101790214-e2759300-3b0a-11eb-8415-973ff504ffad.png)

The table below demonstrates which fields from the Module Type will be rendered on a Module Tile.

| Number in the picture | Corresponding Module Type field|
| :-------------: |:----------------------|
| 1 | Logo | 
| 2 | Title | 
| 3 | Short Description | 
| 4 | External References |

Clicking **Learn More** on a Module Tile or a Module Tile itself takes you to a Description view that you can see below.
Note that the section marked in red in the picture below corresponds to the Description field in the Module Type.

![Screenshot 2020-12-10 at 16 48 27](https://user-images.githubusercontent.com/75419441/101787615-f2d83e80-3b07-11eb-95d6-8b1364674c7d.png)

Next, clicking **Add New Module** takes you to the Add New Integration Module view. 

![Screenshot 2020-12-10 at 16 58 35](https://user-images.githubusercontent.com/75419441/101789043-78a8b980-3b09-11eb-8323-33ed0505f77e.png)

| Number in the picture | Corresponding Module Type field|
| :-------------: |:----------------------|
| 1,2 | Configuration Spec| 
| 3 | Tips | 

## Module Instance Properties

In order to specify the endpoints of your integration module
which SecureX Threat Response should send requests to, please,
tick the checkboxes of the corresponding Supported APIs and fill in the description
of each endpoint in the Capabilities section. 

If your integration requires authorization,
you can select one of the authorization types in the Properties section.
