// Vue 3 Application
const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // Reactive data
        const greeting = ref('Hello Vue.js World!');
        const count = ref(0);
        const name = ref('');
        const isGreeting1 = ref(true);

        // Features list
        const features = ref([
            'Declarative Rendering',
            'Reactive Data Binding',
            'Component-Based Architecture',
            'Directives (v-if, v-for, v-model)',
            'Composition API',
            'Easy State Management',
            'Vue Router for Navigation',
            'Vuex/Pinia for State Management'
        ]);

        // Computed properties
        const buttonText = computed(() => {
            return isGreeting1.value ? 'Switch to Alternative Greeting' : 'Switch to Original Greeting';
        });

        // Methods
        const toggleGreeting = () => {
            isGreeting1.value = !isGreeting1.value;
            greeting.value = isGreeting1.value
                ? 'Hello Vue.js World!'
                : 'Welcome to the Vue Universe!';
        };

        const increment = () => {
            count.value++;
        };

        const decrement = () => {
            if (count.value > 0) {
                count.value--;
            }
        };

        const reset = () => {
            count.value = 0;
        };

        // Return all data and methods to template
        return {
            greeting,
            count,
            name,
            features,
            buttonText,
            toggleGreeting,
            increment,
            decrement,
            reset
        };
    }
}).mount('#app');