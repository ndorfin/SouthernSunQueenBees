# Copy static site
CWD=`pwd`

# Clone Pages repository
cd /tmp
git clone git@github.com:ndorfin/SouthernSunQueenBees.git build

# cd build && git checkout -b YOUR_BRANCH origin/YOUR_BRANCH # If not using master

# Trigger Middleman rebuild
cd $CWD
bundle exec middleman contentful --rebuild

# Push newly built repository
cp -r $CWD/build/* /tmp/build

cd /tmp/build

git add .
git commit -m "Automated Rebuild"
git push -f origin gh-pages
