function MenuData() {
}

MenuData.getMemberMenus = function () {
    return [
        {
            name: '会员管理',
            sref: 'main.myCenter',
            subMenuList: [
                {
                    name: '会员管理',
                    sref: 'main.promotionActive',
                    parent: '会员管理',
                    subMenuList: [
                        {
                            name: '会员列表',
                            sref: 'main.memberList',
                            parent: '会员管理'
                        },
                        {
                            name: '会员审核',
                            sref: 'main.memberAudit',
                            parent: '会员管理'
                        },
                         {
                             name: '资料完善（平台）',
                             sref: 'main.memberInfo',
                             parent: '会员管理'
                         },
                        {
                            name: '查看会员详情',
                            sref: 'main.memberDetail',
                            parent: '会员管理',
                            hidden:'true'
                        },
                        
                        {
                            name: '审核会员详情',
                            sref: 'main.memberAuditInfo',
                            parent: '会员管理',
                            hidden:'true'
                        }
                    ]
                },
                {
                    name: '媒体管理',
                    sref: 'main.mediaPromotion',
                    parent: '会员管理',
                    subMenuList: [
                        {
                            name: '媒体列表',
                            sref: 'main.mediaList',
                            parent: '媒体管理'
                        },
                        {
                            name: '媒体审核',
                            sref: 'main.mediaAudit',
                            parent: '媒体管理'
                        },
                        {
                            name: '媒体黑名单',
                            sref: 'main.mediaBlackList',
                            parent: '媒体管理'
                        },
                        {
                            name: '查看媒体详情',
                            sref: 'main.mediaInfo',
                            parent: '媒体管理',
                            hidden:'true'
                        },
                        {
                            name: '查看媒体审核详情',
                            sref: 'main.mediaAuditInfo',
                            parent: '媒体管理',
                            hidden:'true'
                        },
                        {
                            name: '查看黑名单详情',
                            sref: 'main.blackMedia',
                            parent: '媒体管理',
                            hidden:'true'
                        }
                    ]
                }, {
                    name: '消息管理',
                    sref: 'main.myPromotion',
                    parent: '会员管理',
                    subMenuList: [
                        {
                            name: '消息列表',
                            sref: 'main.messageList',
                            parent: '消息管理'
                        },
                        {
                            name: '用户消息查询',
                            sref: 'main.memberMessage',
                            parent: '消息管理'
                        },
                        {
                            name: '查看消息详情',
                            sref: 'main.messageView',
                            parent: '消息管理',
                            hidden:'true'
                        },
                        
                        {
                            name: '查看会员消息详情',
                            sref: 'main.messageDetail',
                            parent: '消息管理',
                            hidden:'true'
                        },
                        
                        {
                            name: '编辑消息',
                            sref: 'main.messageEdit',
                            parent: '消息管理',
                            hidden:'true'
                        },
                        
                        {
                            name: '创建消息',
                            sref: 'main.messageCreate',
                            parent: '消息管理',
                            hidden:'true'
                        }
                        
                        
                        
                        
                        
                        
                        
                    ]
                }
            ]
        },
        {
            name: '推广管理',
            sref: 'main.adActiveList',
            subMenuList: [
                {
                    name: '广告管理',
                    sref: 'main.adActiveList',
                    parent: '推广管理',
                    subMenuList: [
                        {
                            name: '广告活动列表',
                            sref: 'main.adActiveList',
                            parent: '推广管理'
                        },
                        {
                            name: '新建广告活动',
                            sref: 'main.adActiveAdd',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: '修改广告活动',
                            sref: 'main.adActiveUpdate',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: '审核广告活动',
                            sref: 'main.adActiveAudit',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: '查看广告活动',
                            sref: 'main.adActiveView',
                            parent: '推广管理',
                            hidden:'true'
                        }
                        
                    ]
                },
                {
                    name: '激励管理',
                    sref: 'main.encourageManage',
                    parent: '推广管理',
                    subMenuList: [
                        {
                            name: 'CPS分类管理',
                            sref: 'main.cpsTypeManage',
                            parent: '激励管理'
                        },
                        {
                            name: 'CPS商品管理',
                            sref: 'main.cpsProductManage',
                            parent: '激励管理'
                        },
                        {
                            name: 'CPS活动激励管理',
                            sref: 'main.cpsActivityEncourageManage',
                            parent: '激励管理'
                        },
                        {
                            name: '添加CPS分类',
                            sref: 'main.cpsTypeAdd',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: '修改CPS分类',
                            sref: 'main.cpsTypeUpdate',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: '添加激励方案',
                            sref: 'main.cpsTypeAddEncourage',
                            parent: '推广管理',
                            hidden:'true'
                        }, 
                        {
                            name: '修改激励方案',
                            sref: 'main.cpsTypeUpdateEncourage',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: 'CPS分类详情',
                            sref: 'main.cpsTypeDetail',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: 'CPS活动激励修改',
                            sref: 'main.cpsActivityEncourageUpdate',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: 'CPS活动激励查看',
                            sref: 'main.cpsActivityEncourageView',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: 'CPS活动激励查看',
                            sref: 'main.cpsTypeViewEncourage',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: 'CPS活动激励审核',
                            sref: 'main.cpsActivityEncourageAudit',
                            parent: '推广管理',
                            hidden:'true'
                        },
                        {
                            name: 'CPS活动激励添加',
                            sref: 'main.cpsActivityEncourageAdd',
                            parent: '推广管理',
                            hidden:'true'
                        }
                    ]
                },
                {
                    name: '订单管理',
                    sref: 'main.myPromotion',
                    parent: '推广管理',
                    subMenuList: [
                        {
                            name: 'CPS订单管理',
                            sref: 'main.cpsOrderManage',
                            parent: '订单管理'
                        },
                        {
                            name: '补单结算',
                            sref: 'main.additionalOrderSettle',
                            parent: '订单管理'
                        },
                        {
                            name: '异常订单导入',
                            sref: 'main.exceptionOrderImport',
                            parent: '订单管理'
                        }
                    ]
                }
            ]
        },
        {
            name: '财务管理',
            sref: 'main.financeManagement',
        	  subMenuList: [
                  {
                      name: '财务管理',
                      sref: 'main.financeManagement',
                      parent: '财务管理',
                      subMenuList: [
                          {
                              name: '会员账单查询',
                              sref: 'main.memberBillQuery',
                              parent: '财务管理'
                          },
                          {
                              name: '会员结算明细',
                              sref: 'main.memberDailySummary',
                              parent: '财务管理'
                          },
                          {
                              name: '申请付款管理',
                              sref: 'main.applyPurchase',
                              parent: '财务管理'
                          },
                          {
                              name: '会员账户查询',
                              sref: 'main.accountQuery',
                              parent: '财务管理'
                          },
                          {
                              name: '结算配置项管理',
                              sref: 'main.configItem',
                              parent: '财务管理'
                          },
                          {
                              name: '查看结算单详情',
                              sref: 'main.memberSetlementDetail',
                              parent: '财务管理',
                              hidden:'true'
                          },
                          {
                              name: '提交业务审核结算单',
                              sref: 'main.submitBusinessAudit',
                              parent: '财务管理',
                              hidden:'true'
                          }
                      ]
                  }
              ]
        },
        {
            name: '运营报表',
            sref: 'main.promotionReport',
            subMenuList: [
                              {
                                  name: '运营报表',
                                  sref: 'main.promotionReport',
                                  parent: '运营报表',
                                  subMenuList: [
                                      {
                                          name: '渠道推广明细报表',
                                          sref: 'main.promotionDetailReport',
                                          parent: '运营报表'
                                      },
                                      {
                                          name: '渠道推广效果报表',
                                          sref: 'main.promotionEffectReport',
                                          parent: '运营报表'
                                      }
                                  ]
                              }
                          ]
        },
        {
            name: '页面管理',
            sref: 'main.pageManagement',
            subMenuList: [
                          {
                              name: '公告管理',
                              sref: 'main.notificationManagement',
                              parent: '页面管理',
                              subMenuList: [
                                  {
                                      name: '公告列表',
                                      sref: 'main.notificationList',
                                      parent: '公告管理'
                                  },
                                  {
                                      name: '添加公告',
                                      sref: 'main.addNotification',
                                      parent: '公告管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '编辑公告',
                                      sref: 'main.updateNotification',
                                      parent: '公告管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '查看公告',
                                      sref: 'main.viewNotification',
                                      parent: '公告管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '审核公告',
                                      sref: 'main.approveNotification',
                                      parent: '公告管理',
                                      hidden:'true'
                                  }
                                  
                                  
                                  
                                  
                                  
                                  
                                  
                                  
                              ]
                          },
                          {
                              name: '帮助中心管理',
                              sref: 'main.helpCenterManage',
                              parent: '页面管理',
                              subMenuList: [
                                  {
                                      name: '帮助中心',
                                      sref: 'main.helpCenterList',
                                      parent: '帮助中心管理'
                                  },
                                  {
                                      name: '添加FAQ',
                                      sref: 'main.helpCenterAdd',
                                      parent: '帮助中心管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '修改FAQ',
                                      sref: 'main.updateHelpCenter',
                                      parent: '帮助中心管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '查看热门问题',
                                      sref: 'main.checkHotQuestion',
                                      parent: '帮助中心管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '添加分类',
                                      sref: 'main.addHelpCategory',
                                      parent: '帮助中心管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '修改',
                                      sref: 'main.updateHelpCategory',
                                      parent: '帮助中心管理',
                                      hidden:'true'
                                  }
                              ]
                          },
                          
                          {
                              name: '模板管理',
                              sref: 'main.templateManagement',
                              parent: '页面管理',
                              subMenuList: [
                                  {
                                      name: '模板列表',
                                      sref: 'main.templateList',
                                      parent: '模板管理'
                                  },
                                  {
                                      name: '添加模板',
                                      sref: 'main.addTemplate',
                                      parent: '模板管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '编辑模板',
                                      sref: 'main.editTemplate',
                                      parent: '模板管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '系统模板',
                                      sref: 'main.systemTemplate',
                                      parent: '模板管理',
                                      hidden:'true'
                                  },
                                  {
                                      name: '用户模板',
                                      sref: 'main.userTemplate',
                                      parent: '模板管理',
                                      hidden:'true'
                                  }
                              ]
                          }
                      ]
        },
        {
            name: '系统管理',
            sref: 'main.companyInfo',
            subMenuList: [
                {
                    name: '配置管理',
                    sref: 'main.myIncome',
                    parent: '系统管理',
                    subMenuList: [
                        {
                            name: '配置项管理',
                            sref: 'main.configManagement',
                            parent: '配置管理'
                        },
                        {
                            name: '增加配置项',
                            sref: 'main.createConfig',
                            parent: '配置管理',
                            hidden:'true'
                        },
                        {
                            name: '修改配置项',
                            sref: 'main.editConfig',
                            parent: '配置管理',
                            hidden:'true'
                        }
                    ]
                }
            ]
        }
    ];
};