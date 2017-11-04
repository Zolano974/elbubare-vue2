import restclient from '../restclient'

export default {
    // charge l'état du store via l'API
    loadData: async (store) => {
        try{
            var mediasresponse = await restclient.get('medias')
            store.commit('SYNC_MEDIAS', mediasresponse.data.medias)
        }catch(err){
            console.log('trouble during media syncing : ', err)
        }
        // sync series
        try{
            var seriesresponse = await restclient.get('series')
            store.commit('SYNC_SERIES', seriesresponse.data.series)
        }catch(err){
            console.log('trouble during series syncing : ', err)
        }
    },
    clearData: (store) => {
        store.commit('CLEAR_STORE')
    },
}
