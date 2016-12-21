<progressbar>
    <div class="columns is-multiline is-gapless is-mobile">
    <div if="{ opts.title }" class="column is-6 is-bottom-5">{ opts.title }</div>
    <div if="{ opts.title }" class="column is-6 is-bottom-5 has-text-right">
        <span><strong>{ opts.value }</strong></span>/<span>{ opts.max }</span>
    </div>
    <div class="column is-12">
    <progress class="progress" value="{ opts.value }" max="{ opts.max }"></progress>
    </div>
    </div>
</progressbar>