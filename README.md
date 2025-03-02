## Frontend for Parking API (Simplified Parking Management)

### Why this course was taken?
<ul>
<li>Re-learn React fundamentals - haven't used it for almost a year - and gather deepest knowledge - e.g: how to avoid memory leaks by using native JavaScript libraries.</li>
<li>Consume a Laravel backend server builded in another project from the same author of this course.</li>
</ul>

### About the Application Builded (including server-side)
<li>Parking management simplified - not including payment processment</li>
<li>Multi-tenancy from scratch</li>
<li>Authentication via Laravel Sanctum tokens - for SPAs, similar to JWT</li>
<li>Frontend with React/Tailwindcss</li>
<li>Backend with Laravel/SQLite</li>

### Methodology
<p>While building this React application from a course from Povillas Korop - a worldwide reference in PHP development - I started to follow a methodology:</p>
<ul>
<li>Reach myself a solution - with some <i>extra glow</i> or not - for the lesson based on the professor's solution - if any</li>
<li>Compare my approach to the professor's</li>
<li>Implement professor's solution</li>
<li>Repeat last steps with the next class</li>
</ul>

### Why this approach?

<p>Currently in my work i deal with projects involving multiple people, and specifically applications that either are mantained for a long time (20-30y), or on the build of newer version of them using modern frameworks.</p>
<p>Frequently i don't get solutions for the problems i face in a pass of magic (the most near to this is, by understanding the business rule around the feature, get a base-solution from LLMs). So i found better, after the initial configs have been set - e.g: how the routing is dealt -, to try my own approach in each class - each class is a feature generally.</p> 
<p>And besides that, why implement my own version based on previous versions of features based on <i>the professor's</i> version? Well, simlar reason: working with others implies developing based on previous code not always written by yourself, so developing based on the professor's approach intends to simulate the real-world scenario i pass daily in work.</p>

### What the "Extra Glow" Mean?

<p>My own solution can include additional aspect not asked by the professor. Below are a few examples from this project:</p>
<ul>
<li>Need of user's confirmation before stopping a parking.</li>
<li>In-live validation per field in a form (without external libraries).</li>
<li>Customized error messages to end-users to avoid system exposures (security issue ignored on the course: there's no logging and the api error messages were showed without change to end-users)</li>
</ul>
