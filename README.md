# Database Config Builder for Kofax RPA

This app is created to be used for RPA projects at de Volksbank using an OTAP pipeline.

The application generates a query string for use in the Kofax RPA `Select from Database` action and a config to create
an appropriate MSSQL database table. It also creates a hash code that can be used to share the configuration and reduce
resource files in projects.

It creates a database table with the following layout:

| omgeving | parameter | value |
|----------|-----------|-------|
| ONT      | ...       | ...   |
| TST      | ...       | ...   |
| ACC      | ...       | ...   |
| PRD      | ...       | ...   |

Here, each parameter is duplicated for each OTAP step, for which a separate value can be used.

The data structure is composed of three objects; the database, the robot list, and the item list. The `id`'s of all
objects are created using the current date and time as key.

### Database

```json
{
  "database": {
    "name": "KofaxRPA-DB",
    "table": "DB_Table_Config"
  }
}
```

The `name` is the name of the database in which the table is stored, whereas `table` is the name of the actual table in
which the values are stored.

### Robots

```json
{
  "robots": [
    {
      "id": 0,
      "items": [0, 1, 2]
    }
  ]
}
```

The `items` store indices that point to the item in the items list.

### Items

```json
{
  "items": [
    {
      "id": 0,
      "name": "default_url",
      "values": ["ont.url", "tst.url", "acc.url", "prd.url"]
    }
  ]
}
```

The `name` is used to store the values by in the database and is used to query
the database in the robot. The `values` correspond to all value used for each environment.