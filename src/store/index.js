import Vuex from 'vuex'
import Vue from 'vue'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)

const mainOption = {
    namespaced: true,
    state: {
        lastestContent: '',
        id: '1',
        longCommentN: '',
        shortCommentN: '',
        share: true,
    },
    actions: {

    },
    mutations: {
        updateId(state, value) {
            state.id = value;
        },
        updateLastestContent(state, value) {
            state.lastestContent = value;
        },
        updateLongComment(state, value) {
            state.longCommentN = value;
        },
        updateShortComment(state, value) {
            state.shortCommentN = value;
        },
        updateShare(state, value) {
            state.share = value;
        },
    },
    getters: {
        TotalComment(state) {
            return state.longCommentN * 1.0 + state.shortCommentN * 1.0
        }
    }
}
const collectOption = {
    namespaced: true,
    actions: {

    },
    mutations: {
        // 收藏的添加以及擦除
        collectItemAppend(state, value) {
            state.collectItem.add(value);
            // let flag = 0
            // state.collectItem.forEach((item) => {
            //     if (item.id == value.id) {
            //         flag = 1
            //     }
            // })
            // if (flag == 0) {
            //     state.collectItem.push(value)
            // }
            // sessionStorage.setItem('collectItem', JSON.stringify(state.collectItem))
        },
        collectItemRemove(state, value) {
            state.collectItem.delete(value);
            // state.collectItem.forEach((item, index) => {
            //         if (item.id == value.id) {
            //             state.collectItem.splice(index, 1);
            //         }
            //     })
            // sessionStorage.setItem('collectItem', JSON.stringify(state.collectItem))
        },
        // 点赞的添加以及擦除
        dianzanItemAppend(state, value) {
            state.dianzanItem.add(value);
            // let flag = 0
            // state.dianzanItem.forEach((item) => {
            //     if (item.id == value.id) {
            //         flag = 1
            //     }
            // })
            // if (flag == 0) {
            //     state.dianzanItem.push(value)
            // }
            // sessionStorage.setItem('dianzanItem', JSON.stringify(state.dianzanItem))
        },
        dianzanItemRemove(state, value) {
            state.dianzanItem.delete(value)
                // state.dianzanItem.forEach((item, index) => {
                //         if (item.id == value.id) {
                //             state.dianzanItem.splice(index, 1);
                //         }
                //     })
                // sessionStorage.setItem('dianzanItem', JSON.stringify(state.dianzanItem))
        },
        ////////////////////////////////////////////
        // 评论的添加以及更新（包含评论点赞状态）
        commentsAppend(state, value) {
            let flag = 0
            state.comments.forEach((item, index) => {
                if (item.id == value.id) {
                    state.comments.splice(index, 1, value)
                    flag = 1
                }
            })
            if (flag == 0) {
                state.comments.push(value)
            }
            // sessionStorage.setItem('comments', JSON.stringify(state.comments))
        },


    },
    state: {
        collectItem: new Set(),
        dianzanItem: new Set(),
        comments: [],
    },
    getters: {

    }
}
export default new Vuex.Store({
    modules: {
        mainOption,
        collectOption
    },
    // plugins: [
    //     createVuexAlong({
    //         // 设置保存的集合名字，避免同站点下的多项目数据冲突
    //         name: "hello-vuex-along",
    //         local: {
    //             list: ["ma"],
    //             // 过滤模块 ma 数据， 将其他的存入 localStorage
    //             isFilter: true,
    //         },
    //         session: {
    //             // 保存模块 ma 中的 a1 到 sessionStorage
    //             list: ["ma.a1"],
    //         },
    //     }),
    // ],
})