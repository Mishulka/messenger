export default `<div class="dialog-container">
    <div class="dialog">
        <h2 class="dialog__title">Тайтл</h2>
        <div class="dialog__body">
            {{> @partial-block }}
        </div>
        <div class="dialog__footer">
            {{> Button label=labelOk type="primary" }}
            {{#if labelCancel}}
                {{> Button label=labelCancel type="link" }}
            {{/if}}
        </div>
    </div>
</div>`
