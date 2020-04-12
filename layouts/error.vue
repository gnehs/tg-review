<template>
	<v-app dark>
		<v-card class="mx-auto" min-width="500">
			<v-card-text>
				<p class="display-1 text--primary">錯誤</p>
				<div class="text--primary">{{error.statusCode === 404? pageNotFound :otherError}}</div>
				<NuxtLink to="/">Home page</NuxtLink>
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script>
export default {
	layout: 'empty',
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			pageNotFound: '404 Not Found',
			otherError: 'An error occurred'
		}
	},
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError
		return {
			title
		}
	}
}
</script>

<style scoped>
	h1 {
		font-size: 20px;
	}
</style>
