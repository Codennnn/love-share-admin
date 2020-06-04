export default {
  sign_in: { code: 2000, data: { token: 'token' } },
  sign_log: {
    code: 2000,
    data: {
      log: [
        {
          position: {},
          device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
          created_at: '2020-06-04T05:59:46.784Z',
        },
        {
          position: {
            code: 2,
            message: 'Timeout expired',
          },
          device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
          created_at: '2020-04-10T15:07:18.472Z',
        },
        {
          position: {
            code: 1,
            latitude: 22.9409,
            longitude: 113.65,
            timestamp: 1586525431059,
            status: '1',
            regeocode: {
              addressComponent: {
                city: '东莞市',
                province: '广东省',
                adcode: '441900',
                district: [],
                towncode: '441900122000',
                streetNumber: {
                  number: '190号',
                  location: '113.650061,22.9408789',
                  direction: '东',
                  distance: '6.6839',
                  street: '厚涌路',
                },
                country: '中国',
                township: '厚街镇',
                businessAreas: [
                  [],
                ],
                building: {
                  name: [],
                  type: [],
                },
                neighborhood: {
                  name: [],
                  type: [],
                },
                citycode: '0769',
              },
              formatted_address: '广东省东莞市厚街镇厚涌路',
            },
            info: 'OK',
            infocode: '10000',
          },
          device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4101.0 Safari/537.36 Edg/83.0.474.0',
          created_at: '2020-04-10T13:30:31.556Z',
        },
        {
          position: {
            code: 2,
            message: 'Timeout expired',
          },
          device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
          created_at: '2020-04-10T12:40:47.176Z',
        },
        {
          position: {
            code: 1,
            latitude: 22.9185154,
            longitude: 113.65748389999999,
            timestamp: 1583371696165,
            status: '1',
            regeocode: {
              addressComponent: {
                city: '东莞市',
                province: '广东省',
                adcode: '441900',
                district: [],
                towncode: '441900122000',
                streetNumber: {
                  number: '205号',
                  location: '113.657049,22.9185044',
                  direction: '西',
                  distance: '44.5698',
                  street: '康乐南路',
                },
                country: '中国',
                township: '厚街镇',
                businessAreas: [
                  [],
                ],
                building: {
                  name: [],
                  type: [],
                },
                neighborhood: {
                  name: '君汇华庭',
                  type: '商务住宅;住宅区;住宅小区',
                },
                citycode: '0769',
              },
              formatted_address: '广东省东莞市厚街镇君汇华庭',
            },
            info: 'OK',
            infocode: '10000',
          },
          device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
          created_at: '2020-03-05T01:28:16.493Z',
        },
      ],
    },
  },
  admin_detail: {
    code: 2000,
    data: {
      admin_detail: {
        gender: 0,
        avatar_url: 'https://portrait.gitee.com/uploads/avatars/user/1608/4826670_chinesee_1578975163.png!avatar200',
        roles: [
          'admin',
        ],
        _id: '5e3c08efde85a4317c424f14',
        account: 'czc12580520',
        nickname: '令狐少侠',
        real_name: '陈梓聪',
        email: 'czc12580520@gmail.com',
        permissions: [
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfc9f',
            module: 'user',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca0',
            module: 'goods',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca1',
            module: 'order',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca2',
            module: 'comment',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca3',
            module: 'guide',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca4',
            module: 'admin',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
        ],
        sign_log: [
          {
            _id: '5ed88dd2100fe03d5cd3a07a',
            device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
            ip: '127.0.0.1',
            updated_at: '2020-06-04T05:59:46.784Z',
            created_at: '2020-06-04T05:59:46.784Z',
          },
          {
            _id: '5e908ba69a5beb98687f75fe',
            position: {
              code: 2,
              message: 'Timeout expired',
            },
            device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
            ip: '127.0.0.1',
            updated_at: '2020-04-10T15:07:18.472Z',
            created_at: '2020-04-10T15:07:18.472Z',
          },
          {
            _id: '5e9074f71d4a2d4a9c8b0df0',
            position: {
              code: 1,
              latitude: 22.9409,
              longitude: 113.65,
              timestamp: 1586525431059,
            },
            device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4101.0 Safari/537.36 Edg/83.0.474.0',
            ip: '127.0.0.1',
            updated_at: '2020-04-10T13:30:31.556Z',
            created_at: '2020-04-10T13:30:31.556Z',
          },
          {
            _id: '5e90694f1d4a2d4a9c8b0dd0',
            position: {
              code: 2,
              message: 'Timeout expired',
            },
            device: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
            ip: '127.0.0.1',
            updated_at: '2020-04-10T12:40:47.176Z',
            created_at: '2020-04-10T12:40:47.176Z',
          },
        ],
        created_at: '2020-02-06T12:39:11.767Z',
        updated_at: '2020-06-04T05:59:46.784Z',
      },
    },
  },
  info: {
    code: 2000,
    data: {
      admin_info: {
        gender: 0,
        avatar_url: 'https://portrait.gitee.com/uploads/avatars/user/1608/4826670_chinesee_1578975163.png!avatar200',
        roles: [
          'admin',
        ],
        _id: '5e3c08efde85a4317c424f14',
        account: 'czc12580520',
        nickname: '令狐少侠',
        real_name: '陈梓聪',
        email: 'czc12580520@gmail.com',
        permissions: [
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfc9f',
            module: 'user',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca0',
            module: 'goods',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca1',
            module: 'order',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca2',
            module: 'comment',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca3',
            module: 'guide',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
          {
            purview: [
              'read',
              'write',
              'create',
              'delete',
            ],
            _id: '5e511597f74e4e265cfdfca4',
            module: 'admin',
            updated_at: '2020-02-22T11:50:47.722Z',
            created_at: '2020-02-22T11:50:47.722Z',
          },
        ],
        created_at: '2020-02-06T12:39:11.767Z',
        updated_at: '2020-06-03T14:04:39.703Z',
        user: {
          avatar_url: 'https://cdn.hrspider.top/avatar-5e3cf87e655b6d04f09ee8d5-1581077671322.jpeg',
          _id: '5e3cf87e655b6d04f09ee8d5',
          nickname: '令狐少侠',
        },
        lock_password: '234',
      },
    },
  },
  admin_list: {
    code: 2000,
    data: {
      admin_list: [
        {
          gender: 0,
          avatar_url: 'https://cdn.hrspider.top/default_avatar_male.jpg',
          _id: '5e9089699a5beb98687f75e4',
          account: 'czc12580522',
          nickname: '张三丰',
          real_name: '张三丰',
          created_at: '2020-04-10T14:57:45.901Z',
          updated_at: '2020-04-10T14:58:58.669Z',
        },
        {
          gender: 1,
          avatar_url: 'https://cdn.hrspider.top/avatar-1581773934480.jpeg',
          _id: '5e40f6f614d6cb54c8b0824d',
          nickname: '蓉儿',
          real_name: '黄蓉',
          account: 'czc12580521',
          created_at: '2020-02-10T06:23:50.504Z',
          updated_at: '2020-04-10T15:07:32.073Z',
        },
        {
          gender: 0,
          avatar_url: 'https://cdn.hrspider.top/avatar-1586525470598.jpeg',
          _id: '5e3c08efde85a4317c424f14',
          account: 'czc12580520',
          nickname: '令狐少侠',
          real_name: '陈梓聪',
          created_at: '2020-02-06T12:39:11.767Z',
          updated_at: '2020-06-03T14:04:39.703Z',
        },
      ],
    },
  },
  todo_list: {
    code: 2000,
    data: {
      todo_list: [
        {
          content: '答辩',
          is_done: false,
          is_important: false,
          is_starred: false,
          is_trashed: false,
          tags: [],
          complete_time: [
            1585670400000,
            1586534400000,
          ],
          _id: '5e911a8594566d16185d0720',
          title: '答辩',
          updated_at: '2020-04-11T01:18:50.663Z',
          created_at: '2020-04-11T01:16:53.020Z',
        },
        {
          content: null,
          is_done: false,
          is_important: false,
          is_starred: false,
          is_trashed: false,
          tags: [
            1,
          ],
          complete_time: [
            1582128000000,
            1582560000000,
          ],
          _id: '5e4febf7f3ea432b5cbbeffd',
          title: '用户黑名单设置',
          updated_at: '2020-02-22T06:19:28.298Z',
          created_at: '2020-02-21T14:40:55.425Z',
        },
        {
          content: null,
          is_done: false,
          is_important: false,
          is_starred: false,
          is_trashed: false,
          tags: [],
          complete_time: [
            1582128000000,
            1582560000000,
          ],
          _id: '5e4febebf3ea432b5cbbeffc',
          title: '会员【选做】',
          updated_at: '2020-02-21T14:41:00.677Z',
          created_at: '2020-02-21T14:40:43.199Z',
        },
        {
          content: null,
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: false,
          tags: [],
          complete_time: [
            1582128000000,
            1582560000000,
          ],
          _id: '5e4feaccf3ea432b5cbbeffb',
          title: '消息模板',
          updated_at: '2020-02-22T03:24:42.893Z',
          created_at: '2020-02-21T14:35:56.597Z',
        },
        {
          content: null,
          is_done: false,
          is_important: false,
          is_starred: false,
          is_trashed: false,
          tags: [],
          complete_time: [
            1582214400000,
            1582560000000,
          ],
          _id: '5e4fea56f3ea432b5cbbeffa',
          title: '求购优化',
          updated_at: '2020-02-21T14:34:06.220Z',
          created_at: '2020-02-21T14:33:58.861Z',
        },
        {
          content: null,
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: false,
          tags: [],
          complete_time: [
            1582128000000,
            1582560000000,
          ],
          _id: '5e4e716396124708a8dd6c5e',
          title: '商品下架管理',
          updated_at: '2020-02-21T14:26:23.733Z',
          created_at: '2020-02-20T11:45:39.458Z',
        },
        {
          content: null,
          is_done: true,
          is_important: false,
          is_starred: true,
          is_trashed: true,
          tags: [],
          complete_time: [
            1581868800000,
            1582128000000,
          ],
          _id: '5e495e4551761315801f6cb2',
          title: '用户财富',
          updated_at: '2020-02-21T14:32:42.355Z',
          created_at: '2020-02-16T15:22:45.000Z',
        },
        {
          content: null,
          is_done: false,
          is_important: true,
          is_starred: false,
          is_trashed: false,
          tags: [],
          complete_time: [
            1582128000000,
            1582560000000,
          ],
          _id: '5e495e0f51761315801f6cb1',
          title: '物品租借',
          updated_at: '2020-02-21T14:32:54.545Z',
          created_at: '2020-02-16T15:21:51.709Z',
        },
        {
          content: '',
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: true,
          tags: [],
          complete_time: [
            1581523200000,
            1581696000000,
          ],
          _id: '5e44d84af2a4d82b4ccf8782',
          title: '商品评价',
          updated_at: '2020-02-21T14:32:40.468Z',
          created_at: '2020-02-13T05:02:02.236Z',
        },
        {
          content: null,
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: true,
          tags: [],
          complete_time: [
            1581523200000,
            1581696000000,
          ],
          _id: '5e44c202f2a4d82b4ccf8775',
          title: '日志系统',
          updated_at: '2020-02-21T14:32:38.694Z',
          created_at: '2020-02-13T03:26:58.660Z',
        },
        {
          content: '',
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: true,
          tags: [],
          complete_time: [
            1581177600000,
            1581696000000,
          ],
          _id: '5e40286edc34cc35e8c6487f',
          title: '部署系统',
          updated_at: '2020-02-21T14:32:35.107Z',
          created_at: '2020-02-09T15:42:38.276Z',
        },
        {
          content: null,
          is_done: false,
          is_important: false,
          is_starred: true,
          is_trashed: false,
          tags: [
            3,
          ],
          complete_time: [
            1581868800000,
            1582128000000,
          ],
          _id: '5e40285adc34cc35e8c6487e',
          title: '后台系统优化',
          updated_at: '2020-02-17T09:41:01.375Z',
          created_at: '2020-02-09T15:42:18.186Z',
        },
        {
          content: null,
          is_done: false,
          is_important: true,
          is_starred: false,
          is_trashed: true,
          tags: [
            4,
            1,
          ],
          complete_time: [
            1581177600000,
            1581696000000,
          ],
          _id: '5e4025d0e8be26073c435137',
          title: '会员管理',
          updated_at: '2020-02-21T14:26:40.108Z',
          created_at: '2020-02-09T15:31:28.639Z',
        },
        {
          content: '',
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: true,
          tags: [],
          complete_time: [
            1581177600000,
            1581696000000,
          ],
          _id: '5e3fdd4f8a91b74bdc2fa00f',
          title: '评价管理',
          updated_at: '2020-02-21T14:33:07.577Z',
          created_at: '2020-02-09T10:22:07.194Z',
        },
        {
          content: null,
          is_done: true,
          is_important: false,
          is_starred: false,
          is_trashed: true,
          tags: [
            1,
          ],
          complete_time: [
            1581177600000,
            1581696000000,
          ],
          _id: '5e3fc89f32da1950d0419159',
          title: '二手回收',
          updated_at: '2020-02-21T14:33:05.898Z',
          created_at: '2020-02-09T08:53:51.801Z',
        },
      ],
    },
  },
  notice_unread: {
    code: 2000,
    data: {
      notice_list: [],
    },
  },
}
