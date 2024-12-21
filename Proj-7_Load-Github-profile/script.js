document.getElementById('fetchButton').addEventListener('click', function(){
    const requestUrl = 'https://api.github.com/users/KartikAmbupe';
    const xhr = new XMLHttpRequest(); //method to make request
    xhr.open('GET', requestUrl);
    xhr.onreadystatechange = function(){// this would be called on every state change
        // 4 means request is done
        if(xhr.readyState === 4 && xhr.status === 200){
            // const data = JSON.parse(this.responseText); // most of the times response from the url is in string form and we have to convert it
            const data = JSON.parse(this.responseText); // convert response to JSON 
            console.log(this.responseText)
            document.getElementById('profilePic').src = data.avatar_url; // set profile picture
            document.getElementById('userName').textContent = data.login; // set user name 
            document.getElementById('bio').textContent = data.bio; // set bio
            document.getElementById('followerCount').textContent = `Followers: ${data.followers}`; // set follower count 
            document.getElementById('profile').style.display = 'block'; // display the profile card
        }
    }
    xhr.send();
  });