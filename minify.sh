for file in "./build"/*.js
do
    filename=$(echo "$(basename "$file")" | cut -f 1 -d ".")
    npm run minify -- -o "./minified/${filename}.min.js" $file
done