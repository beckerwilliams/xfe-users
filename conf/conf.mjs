'use strict';
export default (() => {

    // Inclusion and Exclusion Selectors
    let default_path_exclusions = /META-INF|(\\.)*deps$|(\\.)*DS_Store$|(\\.)*git$|(\\.)*gitignore$|(\\.)*target$|(\\.)*Trash$|(\\.)*idea$|^node_modules$|(\\.)*tmp$|(\\.)*work$|(\\.)*working$|(\\.)*pyenv\\.d$|(\\.)*test$/i;
    let default_fext_selector = /(\\.)*cer$|(\\.)*cert$|(\\.)*crt$|(\\.)*der$|(\\.)*pem$|(\\.)*pkcs1[12]$|(\\.)*pub$|(\\.)*ssh$/i;
    let home_dir = process.env['HOME']

    return {
        "discovery_api": {
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
            "cors_options": {
                "methods": "GET,PUT,DELETE,POST,HEAD,OPTIONS",
                "origin": "*"
            },
            "test": {}
        },
        "collector": {
            "agent": {"options": {"keepAlive": "true", "keepAliveMsecs": 3000, "maxSockets": 1024}},
            "fs": {
                "default_options": {"withFileTypes": "true"},
                "filters": {
                    "default_fext_selector": default_fext_selector,
                    "default_path_exclusions": default_path_exclusions
                },
                "default_discovery_paths": [home_dir],
                "test_data": {
                    "user": [
                        "guest",
                        "2164209168404340744018554687500"
                    ],
                    "file-as-directory": ["./FILE"],
                    "empty-directory": "[./.empty]",
                    "bad-directory": ["/BaDiReCtOrY"],
                    "known-directory": ["/Users/ron/WebStorm"],
                    "default-scan-directories": ["/Users/ron/WebStorm", "/usr/local"]
                },
                "cli_error_msg": {
                    "error": "Usage: ./collect_fs.mjs discovery_dir1 [discovery_dir2 [...[discovery_dirN]]]"
                }
            },
            "net": {}
        }
    };
})();
