<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex sm12 lg12>

          <section class="col-lg-12 connectedSortable">

            <!-- Content -->
            <div class="card card-primary color-palette-box">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-tag"></i> {{ title }}
                </h3>
                <div class="card-tools">
                  <span
                    data-toggle="tooltip"
                    title="3 ข้อความ"
                    class="badge badge-warning"
                    >3</span
                  >
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                BODY
              </div>
              <!-- /.card-body -->
              <div class="card-footer"></div>
              <!-- /.card-footer-->
            </div>
            <!-- /.card -->

          </section>
      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default { 
  components: {
  },
  data() {
    return {
      title: "รายงาน"
    };
  }
};
</script>

<style></style>
