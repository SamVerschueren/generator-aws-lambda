# <%= functionName %>

> <%= functionDescription %>

## Usage

Run the following command to create a zip file.

```
$ npm run zip
```

The zip file, generated in the `dist` directory, can now be deployed to AWS Lambda.

### package.json

Best practice is to use the [files](https://docs.npmjs.com/files/package.json#files) property
in `package.json`. This property determines which files will be included in the zip file.

If the `files` property is not provided, a fallback pattern will be used that tries to create
the zip best effort.

## Author

- <%= name %> [<<%= email %>>]
