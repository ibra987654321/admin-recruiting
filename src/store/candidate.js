import {getAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {CANDIDATE_TYPE} from "@/helpers/endPoints";

export default  {
    state: {},
    actions: {
        getCandidateTypes(store) {
            getAxios(`${environment.testAPI + CANDIDATE_TYPE}/all`)
                .then(r => {
                    r.map(i => {
                        const item = {
                            id: i.id,
                            candidateType: i.candidateType
                        }
                        store.rootState.candidateType.push(item)
                    })
                })
                .catch(e => store.commit('setSnackbars', e.message))
        }
    }
}
