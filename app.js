async function getShortUrl() {
    const long_url = document.getElementById("urlinput").value;

    if (!long_url) {
      return alert("Please enter url");
    }
    const buttonRef = document.getElementById("short-url");
    const linkRef = document.getElementById("link");

    try {
      linkRef.href = "";
      linkRef.innerHTML = "";
      buttonRef.innerHTML = "Generating URL...";
      buttonRef.disabled = true;
      let response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Headers': 'accept',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer 502ff1f5ba32c5d969d61f17c49dd65fc09ca37b`
        },
        body: JSON.stringify({ long_url })
      });
      const { link, description: errorMessage } = await response.json();
      if (!link && errorMessage) {
        throw new Error(errorMessage);
      }
      linkRef.href = link;
      linkRef.innerHTML = link;
    } catch (err) {
      alert(err.message);
    } finally {
      buttonRef.innerHTML = "Short The URL";
      buttonRef.disabled = false;
    }
  }