<style scoped lang="less">
  .project-content {
    padding-bottom: 30px;
  }

  .project-list li {
    line-height: 36px;
  }

  .project-list li span {
    display: inline-block;
  }

  .project-list li .title {
    width: 80px;
    text-align: right;
    margin-right: 10px;
  }

  .project-detail {
    margin-top: 20px;
  }

  .project-create{
    float: right;
    margin-top: 13px;
    margin-right: 20px;
  }

  .project-delete{
    color: #f30;
  }

  .project-list-title {
    line-height: 50px;
    color: #999;
    margin: 20px 0 0 26px;
  }

</style>
<template>
  <div class="project-content">
    <Modal v-model="modal.show"
           v-bind:title="modal.title"
           v-bind:ok-text="modal.okText"
           @on-ok="handleSubmit('projectModel')"
           :loading="modal.loading"
           :closable="false"
           :mask-closable="false">
      <Input type="hidden" v-model="projectId"></Input>
      <Form ref="projectModel" :model="projectModel"  :rules="ruleValidate" :label-width="100" style="padding: 0px 50px 0 0px;">
        <Form-item label="中文名称" prop="projectName">
          <Input v-model="projectModel.projectName" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="项目名称" prop="englishName">
          <Input v-model="projectModel.englishName" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="域名链接" prop="link">
          <Input v-model="projectModel.link" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="头底布局" prop="layout">
          <Select  v-model="projectModel.layout">
            <Option v-for="layoutOption in layoutSelect" :value="layoutOption.value" :key="layoutOption.value">{{layoutOption.text}}</Option>
          </Select>
        </Form-item>
        <Form-item label="描述" prop="desc">
          <Input v-model="projectModel.desc" placeholder="请输入"></Input>
        </Form-item>
      </Form>
    </Modal>
    <Row :gutter="20">
      <Col span="6" style="min-width:200px;max-width:300px;">
      <Menu :active-name="currentIndex" @on-select="getCurrentProject" style="width:100%">
        <div class="project-list-title">
          <span><Icon type="ios-list-outline"></Icon>&nbsp;项目列表</span>
          <Button v-if="permission('create')" class="project-create" type="primary" @click="create" icon="ios-plus-outline" size="small">新建项目</Button>
        </div>
        <Menu-item :key="project._id" :name="index" v-for="(project,index) in projects.results">
          <Icon type="android-globe"></Icon>
          {{project.englishName}}
        </Menu-item>
      </Menu>
      </Col>
      <Col span="10" style="min-width:400px;max-width:500px;">
      <Card dis-hover class="project-detail">
        <p slot="title">
          <Icon type="android-globe"></Icon>
          <span>{{current.englishName}} ({{current.projectName}})</span>
        </p>
        <a v-if="permission('update')" href="javascript:void(0)" slot="extra" @click.prevent="edit(current._id)" style="margin-right:10px">
          <Icon type="edit"></Icon>修改
        </a>
        <a v-if="permission('delete')" class="project-delete" href="javascript:void(0)" slot="extra" @click.prevent="del(current._id)">
          <Icon type="android-delete"></Icon>删除
        </a>
        <ul class="project-list">
          <li>
            <span class="title">中文名称:</span>
            <span>{{current.projectName}}</span>
          </li>
          <li>
            <span class="title">项目名称:</span>
            <span>{{current.englishName}}</span>
          </li>
          <li>
            <span class="title">域名链接:</span>
            <span><a target="_blank" v-bind:href="current.link">{{current.link}}</a></span>
          </li>
          <li>
            <span class="title">头底布局:</span>
            <Select :value="current.layout" style="width:110px;display:inline-block;" disabled="true">
              <Option v-for="layoutOption in layoutSelect" :value="layoutOption.value" :key="layoutOption.value">{{layoutOption.text}}</Option>
            </Select>
          </li>
          <li>
            <span class="title">描述:</span>
            <span>{{current.desc}}</span>
          </li>
        </ul>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Services from '../../services'
  import constants from '../../lib/constants'
  export default {
    name: 'project',
    created () {
      this.$store.dispatch('getProjectList', {index: 0})
    },
    methods: {
      permission (action) {
        let o = {
          groupName: 'project',
          action: action
        }
        return this.$permissionAction(o)
      },
      getCurrentProject (index) {
        this.$store.dispatch('getCurrentProject', index)
      },
      create () {
        this.handleReset('projectModel')
        this.projectId = ''
        this.modal = {
          show: true,
          loading: true,
          title: '添加项目',
          okText: '确认创建'
        }
      },
      edit (id) {
        this.handleReset('projectModel')
        this.projectId = id
        let {projectName, englishName, desc, link, layout} = this.$store.state.project.current
        this.projectModel = {projectName, englishName, desc, link, layout}
        this.modal = {
          show: true,
          loading: true,
          title: '修改项目',
          okText: '确认修改'
        }
      },
      del (id) {
        this.$Modal.confirm({
          title: '提示',
          content: '确认要删除吗?',
          onOk: () => {
            Services.project.deleteProject(id).then((res) => {
              this.$store.dispatch('getProjectList', {index: 0})
              this.$Message.success('删除成功')
            })
          }
        })
      },
      changeLoading () {
        this.modal.loading = false
        this.$nextTick(function () {
          this.modal.loading = true
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.changeLoading()
            return false
          }
          if (this.projectId) {
            Services.project.updateProject({
              ...this.projectModel,
              projectId: this.projectId,
              user: this.$store.state.userInfo.displayName
            }).then((res) => {
              if (res.data.success) {
                this.$Message.success('修改成功')
                this.$store.dispatch('getProjectList')
                // 修改state
              }
            })
          } else {
            delete this.projectModel._id
            Services.project.createProject({
              ...this.projectModel,
              user: this.$store.state.userInfo.displayName
            }).then((res) => {
              if (res.data.success) {
                this.$Message.success('创建成功')
                this.$store.dispatch('getProjectList', {index: 0})
              }
            })
          }
          this.modal.show = false
        })
      }
    },
    data () {
      return {
        modal: {
          loading: true,
          show: false,
          title: '添加项目',
          okText: '确认创建'
        },
        projectId: '',
        projectModel: {
          projectName: '',
          englishName: '',
          icon: '',
          link: '',
          layout: '',
          desc: ''
        },
        layoutSelect: constants.layoutSelect,
        ruleValidate: {
          projectName: [
            {required: true, message: '请输入中文名称', trigger: 'blur'}
          ],
          englishName: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '请输入域名,含协议', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState(['currentIndex']),
      projects () {
        return this.$store.state.project.projects
      },
      current () {
        return this.$store.state.project.current
      }
    }
  }
</script>
