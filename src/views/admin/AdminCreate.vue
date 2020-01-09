<template>
  <div class="p-6 base-shadow bg-white rounded-lg">
    <div class="mb-5 flex">
      <div class="w-1/2 pr-5">

      </div>
      <div class="w-1/2">
        <EditForm />
      </div>
    </div>

    <div
      class="mb-5 p-5 rounded-lg"
      style="border: 1px solid #e4e4e4;"
    >
      <p class="text-lg text-gray-600">权 限</p>
      <vs-divider />
      <EditPermission :editable="true" />
    </div>
  </div>
</template>

<script>
import EditForm from './edit/EditForm.vue'
import EditPermission from './edit/EditPermission.vue'

export default {
  name: 'AdminCreate',
  components: { EditForm, EditPermission },
}
</script>
