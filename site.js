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
        fetch(self.file).then(function (response) {
            if (response.status === 404) {
                self.code = 'ERROR: File ' + self.file + ' not found...';
            } else if (response.status === 200) {
                response.text().then(txt => {
                    self.code = txt;

                    setTimeout(function() {
                        var block = self.$el.querySelector('pre code');
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
        <div class="nine columns">
            <h4 v-if="item.slug"><router-link exact v-bind:to="'/blog/' + item.slug">{{ item.title }}</router-link></h4>
            <h4 v-else>{{ item.title }}</h4>
        </div>
        <div class="three columns publish-date"><i>{{ item.publishedDate }}</i></div>
    </div>
    <div class="row">
        <blog-fragment v-for="(fragment, index) of item.content" v-bind:content="fragment" v-bind:key="index" />
    </div></div>`
});

const BlogPage = Vue.component('blog-page', {
    data: function() {
        return {
            blog: null
        }
    },
    template: `<div>
        <blog v-if="blog" v-bind:item="blog" />
        <div v-else>
            <h4>Blog not found</h4>
            <p>The requested blog could not be found.</p>
        </div>
    </div>`,
    mounted: function() {
        const self = this;
        fetch('data/blogs.json').then(function (response) {
            response.json().then(function (blogs) {
                self.blog = blogs.find(item => item.slug === self.$route.params.slug);
            });
        });
    }
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
    template: `<div><div class="row">
        <h5>Background</h5>
        <p>
            Hi, my name is Dennis Seller, and I am a Software Architect with 10 years of experience in designing and building software, ranging from web applications 
            to large backend systems. During my professional career, I have used a wide range of technologies including but not limited to C#, .NET, SQL Server 2005+, 
            WCF and ASP.NET (MVC).
        </p>

        <p>
            The projects I have completed are of a very diverse nature, for clients including the public sector, energy companies, and the educational sector. 
            I enjoy devising creative solutions to complex matter. In my spare time I like to stay up to date on the latest developments regarding my
            areas of expertise, and experimenting with cutting-edge technologies.
        </p>

        <p>
            I also enjoy working on my private projects, like my own Operating System, and my own actor-based programming language.
        </p>
    </div>
    <div class="row">
        <h5>Skills</h5>
        <div class="three columns">
            <ul>
                <li>C#</li>
                <li>C / C++</li>
                <li>Javascript / Typescript</li>
                <li>Assembly</li>
                <li>Flex / Bison / ANTLR</li>
                <li>SQL</li>
                <li>CSS / SASS</li>
            </ul>
        </div>
        <div class="three columns">
            <ul>
                <li>.NET (+ Core)</li>
                <li>Angular</li>
                <li>React</li>
                <li>Vue</li>
                <li>Entity Framework</li>
                <li>Akka.NET</li>
            </ul>
        </div>
        <div class="three columns">
            <ul>
                <li>Web Development</li>
                <li>Software Architecture</li>
                <li>Design Patterns</li>
                <li>Windows &amp; Linux</li>
            </ul>
        </div>
    </div>
    <h5>Experience</h5>
    <div class="row">
        <div class="three columns">
            <img class="logo" src="/images/pa.png" />
        </div>
        <div class="eight columns">
            <h4 class="position">Software Architect</h4> <span class="timespan">July 2017 - Now</span>
            <p>
                TODO
            </p>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="three columns">
            <img class="logo" src="/images/raet.jpg" />
        </div>
        <div class="eight columns">
            <h4 class="position">Technical Lead</h4> <span class="timespan">May 2016 - July 2017</span>
            <p>
                TODO
            </p>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="three columns">
            <img class="logo" src="/images/rvo.png" />
        </div>
        <div class="eight columns">
            <h4 class="position">Software Architect</h4> <span class="timespan">March 2015 - May 2016</span>
            <p>
                The RVO has requested the creation of an application in which building owners can request an energy label, in order to comply with European Union law.
                I have worked on this project in the role of Software Architect and/or Lead Developer. 
            </p>

            <p>
                
            </p>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="three columns">
            <img class="logo" src="/images/minez.png" />
        </div>
        <div class="eight columns">
            <h4 class="position">Senior Software Engineer</h4> <span class="timespan">February 2015 - March 2015</span>
            <p>
                The Ministry of Economic Affairs uses an application to measure the regulatory pressure among companies and civilians. This application produces
                reports, which are subsequently used in parliament to create new laws.
            </p>

            <p>
                I had to modify this application to allow it to produce the data requested by the parliament. This was a high pressure job, which was finished
                in only 3 weeks total.
            </p>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="three columns">
            <img class="logo" src="/images/measuremail.png" />
        </div>
        <div class="eight columns">
            <h4 class="position">Senior Software Engineer</h4> <span class="timespan">January 2010 - February 2015</span>
            <p>
                As one of the (web)developers in this company, I perform various tasks. Including, but not limited to, developing the core application 'Measuremail', 
                which allows clients to send large email campaigns to consumers. I also wrote the application's API from scratch, to allow 3rd party systems to 
                manipulate the customer database, create and edit personalized messages and launch campaigns.
            </p>

            <p>
                Recently I have developed the cutting-edge software called "CampaignCloud" together with a very small group of dedicated colleagues 
                (consisting of an interaction designer & a manager).
            </p>
            
            <p>
                Aside from development of the core application(s), Measuremail B.V. is often approached to build applications, ranging from small to large projects. 
                My field of activity also lies in this area; developing software on a project basis to allow for closer integration of systems with our own
                applications.
            </p>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="three columns">
            <img class="logo" src="/images/woemu.png" />
        </div>
        <div class="eight columns">
            <h4 class="position">Project Lead</h4> <span class="timespan">April 2007 - May 2010</span>
            <p>
                This is a project I started myself, for enthusiasts on an indie game called "Wurm Online". This is an MMORPG with a small playerbase, but appealed 
                to me so much that I decided to write a private server or "server emulator" for it, from scratch.
            </p>

            <p>
                First of all, I was the founder, project leader and lead developer of the project. I was responsible for gathering project resources, and directing 
                developers to perform tasks regarding development of the core system. My activity as lead developer was to extend the system with new features, 
                keep an eye on the work being done and reverse engineer the protocol.
            </p>
        </div>
    </div></div>`
});

const routes = [{
    path: '/',
    component: Blogs
}, {
    path: '/blog/:slug',
    component: BlogPage
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

