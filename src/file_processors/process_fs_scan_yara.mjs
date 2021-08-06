// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 
const yara = require('yara');

yara.initialize(function(error) {
    if (error) {
        console.error(error.message)
    } else {
        const rule_string = [
            "rule is_good {",
            "	condition:",
            "		true",
            "}"
        ].join("\n");

        const rules = [
            {filename: "rules.yara"},
            {string: rule_string}
        ];

        const scanner = yara.createScanner();

        scanner.configure({rules: rules}, function(error, warnings) {
            if (error) {
                if (error instanceof yara.CompileRulesError) {
                    console.error(error.message + ": " + JSON.stringify(error.errors));
                } else {
                    console.error(error.message);
                }
            } else {
                if (warnings.length) {
                    console.error("Compile warnings: " + JSON.stringify(warnings));
                } else {
                    const req = {buffer: Buffer.from("content")};

                    scanner.scan(req, function(error, result) {
                        if (error) {
                            console.error(error.message);
                        } else {
                            console.error(JSON.stringify(result));
                        }
                    });
                }
            }
        });
    }
});