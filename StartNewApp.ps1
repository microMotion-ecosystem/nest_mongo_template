# Get the name of the parent folder
$parentFolderName = Split-Path -Leaf (Get-Location)

# Step 1: Add new remote link in git
git remote add template https://github.com/microMotion-ecosystem/nest_mongo_template.git

# Step 2: Search and replace <APP_NAME> with the parent folder name
Get-ChildItem -Recurse -Include *.ts,*.json, .env, .env.* | ForEach-Object {
    (Get-Content $_.FullName) -replace '<APP_NAME>', $parentFolderName | Set-Content $_.FullName
}
