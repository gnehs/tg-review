<template>
	<div>
		<v-row dense>
			<v-col cols="12" v-for="item of data" :key="item.id">
				<v-card class="mx-auto" max-width="500">
					<v-card-text>
						<div class="overline mb-4">#{{item.id}}</div>
						<p class="display-1 text--primary">{{item.title.rendered}}</p>

						<v-chip v-for="cat of item.categories" :key="cat">{{categories[cat]}}</v-chip>
						<br />
						<br />
						<div class="text--primary" v-html="item.content.rendered" />
					</v-card-text>
					<v-card-actions>
						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<v-btn text :href="item.meta['tg-link']" target="_blank" v-on="on">前往連結</v-btn>
							</template>
							<span>{{item.meta['tg-link']}}</span>
						</v-tooltip>

						<v-spacer></v-spacer>
						<v-btn text>刪除</v-btn>
						<v-btn text color="deep-purple accent-4">發布</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	created() {
		this.fetchData()
	},
	data: () => ({
		data: null,
		categories: null,
	}),
	methods: {
		async fetchData() {
			this.$axios.get('/api/categories').then(response => {
				this.categories = response.data;
			});
			this.$axios.get('/api/posts').then(response => {
				this.data = response.data;
			});
		},
	}
};
</script>