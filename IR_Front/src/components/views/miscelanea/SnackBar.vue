<template>
    <div>
        <v-snackbar
        v-model="visible"
        :color="snackbar.color"
        :timeout=10000
        :multi-line="snackbar.multiLinhas"
        :vertical="snackbar.false"
        :bottom='snackbar.bottom'
        :left='snackbar.left'
        :right="snackbar.right"
        :top='snackbar.top'
        >
        {{snackbar.message}}
        <v-btn text @click="visible = false"><v-icon>close</v-icon></v-btn>
        </v-snackbar>
    </div>
</template>

<script>
export default {
	name: 'SnackBar',
	data () {
		return {
			visible: false,
			snackbar: {
				message: '',
				color: 'success',
				bottom:	false,
				left:	false,
				right:	true,
				top:	true,
				multiLinhas: true
			}
		}
	},
	methods: {
		show (obj) {
			this.visible = true;
			this.snackbar = obj;
		},
		hide () {
			this.visible = false;
		}
	}
}
</script>
