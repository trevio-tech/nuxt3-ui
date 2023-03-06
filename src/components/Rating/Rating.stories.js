import Rating from './Rating.vue'
import { ref } from 'vue'

export default {
  title: 'Rating',
  component: Rating,
}

const Template = (args) => ({
  components: {
    Rating
  },
  setup() {
    const value = ref(1)

    return {
      args,
      value
    }
  },
  template: `
    <Rating v-model="value" inactive />
    {{ value }}
  `,
});

export const Default = Template.bind({});
