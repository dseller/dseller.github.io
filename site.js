Vue.component('text-fragment', {
    props: ['text'],
    template: '<p>{{ text }}</p>'
});

Vue.component('image-fragment', {
    props: ['url'],
    template: '<img v-bind:src="url" />'
});

Vue.component('code-fragment', {
    data: function() {
        return {
            code: ''
        };
    },
    props: ['file', 'language'],
    template: '<pre><code>{{ code }}</code></pre>',
    mounted: function() {
        const self = this;
        console.log(self);
        fetch(self.file).then(function (response) {
            if (response.status === 404) {
                self.code = 'ERROR: File ' + self.file + ' not found...';
            } else if (response.status === 200) {
                response.text().then(txt => {
                    self.code = txt;

                    setTimeout(function() {
                        var block = self.$el.querySelector('pre code');
                        console.log(block);
                        hljs.highlightBlock(block);
                    }, 500);
                });
            }
        });
    },
    methods: {
        getLanguage: function() {
            return 
        }
    }
});

Vue.component('bullet-list-fragment', {
    props: ['items'],
    template: `<ul>
        <li v-for="item of items" v-bind:key="item">{{ item }}</li>
    </ul>`
});

Vue.component('quote-fragment', {
    props: ['quote'],
    template: `<div class="quote">
        {{ quote }}
    </div>`
})

Vue.component('chapter-fragment', {
    props: ['name'],
    template: `<h5>{{ name }}</h5>`
});

Vue.component('blog-fragment', {
    data: function() {
        return {
            html: ''
        }
    },
    props: ['content'],
    template: `<div>
        <text-fragment v-if="typeof(content) === 'string'" v-bind:text="content" />
        <image-fragment v-if="typeof(content) === 'object' && content.image" v-bind:url="content.image" />
        <code-fragment v-if="typeof(content) === 'object' && content.codeFile" v-bind:file="content.codeFile" />
        <bullet-list-fragment v-if="typeof(content) === 'object' && content.bulletList" v-bind:items="content.bulletList" />
        <chapter-fragment v-if="typeof(content) === 'object' && content.chapter" v-bind:name="content.chapter" />
        <quote-fragment v-if="typeof(content) === 'object' && content.quote" v-bind:quote="content.quote" v-bind:language="content.language" />
    </div>`,
    mounted: function() {
        if (typeof(this.content) === 'string') {
            this.html = `<p>${this.content}</p>`;
        }
    }
});

const Blog = Vue.component('blog', {
    props: ['item'],
    template: `<div><hr/><div class="row">
        <div class="nine columns"><h4>{{ item.title }}</h4></div>
        <div class="three columns publish-date"><i>{{ item.publishedDate }}</i></div>
    </div>
    <div class="row">
        <blog-fragment v-for="(fragment, index) of item.content" v-bind:content="fragment" v-bind:key="index" />
    </div></div>`
});

const Blogs = Vue.component('blogs', {
    data: function() {
        return {
            blogs: []
        }
    },
    template: `<ul>
        <blog v-for="blog of blogs" v-bind:key="blog.publishDate" v-bind:item="blog" />
    </ul>`,
    mounted: function() {
        const self = this;
        fetch('data/blogs.json').then(function (response) {
            response.json().then(function (blogs) {
                self.blogs = blogs;
            });
        });
    }
});

const About = Vue.component('about', {
    template: '<div>Hello World!</div>'
});

const routes = [{
    path: '/',
    component: Blogs
}, {
    path: '/about',
    component: About
}];

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app');

