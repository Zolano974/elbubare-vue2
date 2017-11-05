export default {
    fetchToken: (state) => {
        // return (state.token === null && localStorage.getItem('token').length > 0) ? localStorage.getItem('token') : state.token

        let token = state.token
        if(state.token === null && localStorage.getItem('token').length > 0){
            // console.log('state.token NLL et localstorage non vide :')
            // console.log('state.token => ' + state.token)
            // console.log('localstorage.token => ' + localStorage.getItem('token'))
            token = localStorage.getItem('token')
        }
        if(token !== null){
            localStorage.setItem('token', token)
        }
        else{
            localStorage.setItem('token', '')
        }
        return token
    }
}