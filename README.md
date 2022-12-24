# Database Config Builder for Kofax RPA

This app is created to be used for RPA projects at de Volksbank using an OTAP pipeline.

The application generates a query string for use in the Kofax RPA `Select from Database` action and a config to create an appropriate MSSQL database table. It also creates a hash code that can be used to share the configuration and reduce resource files in projects.

It creates an MSSQL database table with the following layout:

| omgeving | parameter | value |
| ----------- | ----------- | ----------- |
| ONT | ... | ... |
| TST | ... | ... |
| ACC | ... | ... |
| PRD | ... | ... |

Here, each parameter is duplicated for each OTAP step, for which a separate value can be used.
