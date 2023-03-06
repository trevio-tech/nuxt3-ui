import Select from './Select.vue'
import { ref } from 'vue'

export default {
  title: 'Select',
  component: Select,
}

const Template = (args) => ({
  components: {
    Select
  },
  setup() {
    const people = [
      { name: 'Андрей' },
      { name: 'Денис' },
      { name: 'Дмитрий' },
      { name: 'Андрей' },
      { name: 'Денис' },
      { name: 'Дмитрий' },
      { name: 'Андрей' },
      { name: 'Денис' },
      { name: 'Дмитрий' },
      { name: 'Андрей' },
      { name: 'Денис' },
      { name: 'Дмитрий' },
    ]

    const value = ref('Дмитрий')

    return {
      args,
      people,
      value
    }
  },
  template: `
    <Select v-model="value" :items="people" track-by="name" />
    {{ value }}
  `,
});

export const Default = Template.bind({});
