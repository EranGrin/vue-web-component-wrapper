<template>
    <div
     class="bg-yellow-300" 
    >
        <div>
            <router-view
            />
        </div>
    </div>
</template>

<script>

import './assets/tailwind.css'
export default {
    name: 'Main',
    props: {
        apiToken: { type: String, required: true },
        baseUri: { type: String, default: 'test.me' },
    },

    data: () => ({
        configuration: {},
        credentials: {
            apiToken: '',
            baseUri: '',
        },
    }),

    created() {
        console.log(this);
    },

};
</script>
<style >
.test-heading {
    font-size: 2em;
    margin-top: 2rem;
}
</style>

