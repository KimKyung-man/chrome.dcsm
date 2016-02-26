1.0.x
==========

## 1.0.1

### Bug Fixes
- **[modules/util/ajax.js](https://github.com/lesomnus/chrome.dcsm/blob/master/src/modules/util/ajax.js)**
  - 글 목록을 요청하는 방법을 근본적으로 수정하면서, 일부 갤러리의 개념글 목록이 보이지 않던 문제가 고쳐짐.
    ([e3664e34](e3664e342e81eb2c6493dd52e89dd1659176612a),
     [#10](https://github.com/lesomnus/chrome.dcsm/issues/10),
     [#11](https://github.com/lesomnus/chrome.dcsm/pull/11))

### Enhancements
- **[modules/control/form_comment_write.js](https://github.com/lesomnus/chrome.dcsm/blob/master/src/modules/control/form_comment_write.js)**
  - 댓글 작성 중 `Enter`입력시, 개행 대신에 바로 Submit 되도록 개선되었습니다.
    ([c41c947a](c41c947a2770ca5fd1e03c302bcd3447bae5907c),
     [#3](https://github.com/lesomnus/chrome.dcsm/issues/3))
- **[modules/control/list.js](https://github.com/lesomnus/chrome.dcsm/blob/master/src/modules/control/list.js)**
  - 목록을 `Refresh`할 때, 이미 로드된 정보가 다시 로드됐을 경우, 해당 `ListItem`을 업데이트하도록 개선되었습니다. 
    ([b0da979b](b0da979bde65aa85fc5a0a09d39c0c6a14c7cb3f),
     [#4](https://github.com/lesomnus/chrome.dcsm/issues/14))