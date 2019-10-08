<template>
	<v-navigation-drawer
		permanent fixed persistent
		width="200" :mini-variant="value" clipped disable-route-watcher app
		mobile-break-point="100">
		<v-list
			dense
			nav>
			<v-list-item
				:to="item.route"
				v-for="item in items"
				:key="item.title"
				class="v-list-item">
				<v-list-item-icon>
					<v-icon color="indigo" medium>{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-title
					v-text="item.text"
				></v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'Drawer',
	props: {
		items: { type: Array, required: true },
		value: { type: Boolean, default: false }
	}
}
</script>
