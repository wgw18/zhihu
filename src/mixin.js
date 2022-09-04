export const mixin = {
    data() {
        return {

        }
    },
    methods: {
        viewDetail(id) {
            this.$store.commit('mainOption/updateId', id)
            this.$router.push({ name: 'newsdetail' });
        },
        back() {
            this.$router.back(-1);
        }
    },
}