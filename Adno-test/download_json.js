    var jsonData = {
        name: "Jonth",
        email: "jobtd@mail.com",
        website: "www.4codev.com"
    };

    const e = document.getElementById('json');
    e.innerHTML = JSON.stringify(jsonData);

    function download(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function onDownload(){
        download(JSON.stringify(jsonData), "data.json", "text/plain");
    }
		