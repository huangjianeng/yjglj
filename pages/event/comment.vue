<template>
	<view class="comment_wrap">
		<view class="head">
			<view>讨论区</view>
		</view>
		<view class="content">
			<CommentItem v-for="(v,i) in data" :key="i" :item="v" level="1"></CommentItem>
		</view>
	</view>
</template>

<script>
	import CommentItem from './commentItem.vue'
	export default {
		components:{
			CommentItem
		},
		data() {
			return {
				title: 'Hello',
				data: []
			}
		},
		mounted() {
			this.init()
			console.log(this.data)
		},
		methods: {
			init() {
				let arr = []
				for (let i = 1; i < 10; i++) {
					let obj = {
						name: '张' + i,
						text: '第' + i + '条评论',
						time:'2022-05-12 10:12',
						childs: [],
					}
					for (let index = 1; index < 3; index++) {
						obj.childs.push({
							name: '子' + i,
							text: '第' + i + '条评论的子评论',
							time:'2022-05-12 10:12',
							childs: [],
						})
					}
					arr.push(obj)
				}
				this.data = arr
			}
		}
	}
</script>

<style>
	.head {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 600;
		color: #1D2732;
	}

	.content {
		padding: 10px;
		background-color: white;
		border-radius: 10px;
	}
</style>
