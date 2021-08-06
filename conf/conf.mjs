'use strict';
export default (() => {
    let deny = /|(\\.)*deps$|\\.DS_Store$|(\\.)*git$|(\\.)*gitignore$|(\\.)*target$|(\\.)*Trash$|(\\.)*idea$|(\\.)*node|(\\.)*node_modules|(\\.)*npm|(\\.)*tmp$|work$|working$|\\.pyenv.d$|}/i;
    let permit = /|(\\.)*pem$|(\\.)*der$|(\\.)*cer$|(\\.)*crt|(\\.)*key$|(\\.)*pub$|(\\.)*png$|(\\.)*ssh$/i;

    return {
        "servers": {
            "test_data": {
                "db": {
                    "admin": "50113184563815593719482421875000",
                    "ron": "5736971395090222358703613281250",
                    "guest": "2164209168404340744018554687500"
                },
                "test_user": [
                    "guest",
                    "2164209168404340744018554687500"
                ]
            },
            "app": {
                "options": {
                    "host": "localhost",
                    "port": 3000
                }
            },
            "admin": {
                "options": {
                    "host": "localhost",
                    "port": 3737
                }
            },
            "test": {}
        },
        "cors_options": {
            "methods": "GET,PUT,DELETE,POST,HEAD,OPTIONS",
            "origin": "*"
        },
        "Collector": {
            "fs": {
                "default_options": {
                    "withFileTypes": "true"
                },
                "filters": {
                    "d_paths": permit,
                    "d_filters": deny
                },
                "default_discovery_paths": ["/System", "/Library", "/usr/local"],
                "developer_notes": "The First Entry APPEARS to requires a '|' at the beginning of the entry, AFTER Regex START '/'. SEE REGEX DOCUMENTATION TO SEE WHY",
                "test_data": {
                    "user": [
                        "guest",
                        "2164209168404340744018554687500"
                    ],
                    "file-as-directory": "./FILE",
                    "empty-directory": "./.empty",
                    "bad-directory": "/BaDiReCtOrY",
                    "known-directory": "/Users/ron/WebStorm"
                },
                "cli_messages": {
                    "error": "Usage: ./scan_fs.mjs <name of directory>"
                }
            },
            "net": {}
        }
    };
})();
