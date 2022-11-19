# Turbo Client

[turbo](https://github.com/didi/turbo)执行引擎对应前端项目。

 ## 使用方式

 在本地启动turbo项目后，将`.env.development`中的`VITE_SERVER_ADDR`地址改成后端服务地址。一般后端默认就是8080，所以你直接把#删掉，然后重命名`.env.development`为`.env`即可。

 ## 演示效果

![1](https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/turbo/1.png)

![2](https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/turbo/2.png)

## turboAdapter

由于logicflow默认的数据格式和turbo默认的数据格式存在一定差异。所以我们需要使用[turboAdapter](https://github.com/Logic-Flow/turbo-client/blob/master/src/components/turboAdapter.js)来实现将logicflow的数据格式与turbo数据格式的相互转换。turboAdapter已经被封装为一个插件，所以直接当做插件使用即可。使用方式

```js
import LogicFlow from '@logicflow/core'
import { BpmnElement } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import turboAdapter from './turboAdapter'

this.lf = new LogicFlow({
  // ...
  plugins: [
    BpmnElement,
    turboAdapter,
  ]
})


```

如上源码所示：turboAdapter默认将turbo数据转换为bpmn节点，在实际项目中，可以完全自定义节点，而不是使用bpmn节点。具体用法请参考LogicFlow[自定义节点](http://logic-flow.org/guide/basic/node.html)。

## 启动遇到问题

如果在windows环境启动遇到问题，可以先跳过这个步骤，直接复制dist里面的静态文档到后端项目的静态资源服务器即可，如tomcat。

也欢迎使用windows的同学解决启动问题提PR。

