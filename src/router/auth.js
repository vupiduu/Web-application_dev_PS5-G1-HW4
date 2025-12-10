export default {
    user: { authenticated: false },
    authenticated: function() {
        return fetch("http://localhost:3000/auth/authenticate", {
            credentials: 'include'})
            .then((response) => response.json())
            .then((data) => {
                this.user.authenticated = data.authenticated;
                console.log(data.authenticated)
                return data.authenticated;
            }).then()
            .catch((e) => {
                console.log("error logout");});
    }
}