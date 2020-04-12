<template>
	<div style="width:500px;margin: 10px auto;">
		<v-row v-show="data&&categories&&data.length>0">
			<transition-group tag="div" name="songlist" style="position: relative">
				<template v-for="item of data">
					<v-col cols="12" :key="item.id">
						<v-card class="mx-auto" max-width="500" min-width="500">
							<v-card-text>
								<div class="overline mb-4">#{{item.id}}</div>
								<p class="display-1 text--primary">{{item.title.rendered}}</p>

								<v-chip
									v-for="category of item.categories"
									class="mr-1"
									:key="category"
								>{{categories[category]}}</v-chip>
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
								<v-btn
									text
									:href="`https://tg.gnehs.net/wp-admin/post.php?action=edit&post=${item.id}`"
									target="_blank"
								>編輯</v-btn>

								<v-spacer></v-spacer>
								<v-btn text @click="updatePost('delete',item.id)">刪除</v-btn>
								<v-btn text @click="updatePost('publish',item.id)" color="deep-purple accent-4">發布</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</template>
			</transition-group>
		</v-row>
		<div v-show="!loading&&data&&data.length==0">
			<v-card class="mx-auto" max-width="500">
				<v-card-text>
					<p class="display-1 text--primary">空</p>
					<div class="text--primary">尚無項目可供審核！</div>
				</v-card-text>
			</v-card>
		</div>
		<div class="text-center" v-show="loading||!data">
			<v-progress-circular indeterminate color="primary" />
		</div>
	</div>
</template>

<script>
export default {
	created() {
		this.fetchData()
	},
	data: () => ({
		loading: true,
		data: null,
		categories: null,
	}),
	methods: {
		async fetchData() {
			this.loading = true
			this.$axios.get('/api/categories').then(response => {
				this.categories = response.data;
			});
			this.$axios.get('/api/posts').then(response => {
				this.data = response.data;
			});
			this.loading = false
		},
		async updatePost(action, id) {
			this.data = this.data.filter(x => x.id != id)
			await this.$axios.post('/api/post', { action, id })
			this.fetchData()
		}
	}
};
</script>