Current planed actions:

1. (COMPLETE) => Move DS into the project folder structure.
2. (COMPLETE) => Test the DS/CL is working by publishing a version that points to the local folder version (NOT in dist)
3. (COMPLETE) => Test that the CL can be called directly in the frontend project
4. (COMPLETE) => Figure out any selector naming conflicts that may exist and figure out a way around them:
    -There are numerous conflicts, resulting in serious issues. There are a number of things that could be done to get around this.
        -Rename selectors in the CL (likely the best option).
        -Use lazy loading to avoid the conflicting names being loaded at the same time. This would work well, but could be very difficult to implement and maintain
5. (COMPLETE) Implement fix to selector conflicts
6. Track down and come up with solution for DS conflicts (like the button selector)
7. Update scripts to move the DS files into the dist on build
8. Update Lab 6 NPM package to point to the folder inside the dist
9. Test build/deploy works