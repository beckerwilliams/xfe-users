export default (() => {
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
        "ScanFs": {
            "default_options": {
                "withFileTypes": "true"
            },
            "filters": {
                "default_accept_file_ext_rgx": "/|\\.pem$|\\.der$|\\.cer$|\\.key$|\\.pub$|\\.png$|\\.ssh$/",
                "default_path_exclusions": "/|(\\.)*deps$|\\.DS_Store$|(\\.)*git$|(\\.)*gitignore$|\\.target$|(\\.)*Trash$|(\\.)*idea$|(\\.)*npm$|node$|node_modules$|npm$System$|(\\.)*tmp$work$|working$|\\.pyenv.d$|}/",
                "developer_notes": "The First Entry APPEARS to requires a '|' at the beginning of the entry, AFTER Regex START '/'. SEE REGEX DOCUMENTATION TO SEE WHY"
            },
            "cli_messages": {
                "error": "Usage: ./scan_fs.js <name of directory>"
            },
            "test": {
                "user": [
                    "guest",
                    "2164209168404340744018554687500"
                ]
            }
        }
    };
})();
