import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'danger', 'success'],
    },
  },
};

const Template = (args) => ({
  components: {
    Checkbox
  },
  setup() {
    const checkbox = ref('Дмитрий')

    return {
      args,
      checkbox,
    }
  },
  template: `
    {{ checkbox }}
    <div class="space-y-4">
      <Checkbox v-model="checkbox" value="Денис" v-bind="args" id="checkbox-1">
        Чекбокс
        <template #help>
          Вспомогательный текст для чекбокса
        </template>
      </Checkbox>
      <Checkbox v-model="checkbox" value="Андрей" v-bind="args" id="checkbox-2">Чекбокс</Checkbox>
      <Checkbox v-model="checkbox" value="Дмитрий" v-bind="args" id="checkbox-3">Чекбокс</Checkbox>
    </div>
  `,
});

export const Default = Template.bind({});

export const danger = Template.bind({});
danger.args = {
  variant:  'danger',
};

export const success = Template.bind({});
success.args = {
  variant:  'success',
};
