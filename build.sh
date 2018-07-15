# Copy static site
CWD=`pwd`

# Clone Pages repository
cd /tmp
git clone git@github.com:ndorfin/SouthernSunQueenBees.git build
cd build && git checkout -b gh-pages origin/gh-pages

# Trigger Middleman rebuild
cd $CWD
bundle exec middleman contentful && bundle exec middleman build

# Push newly built repository
cp -r $CWD/build/* /tmp/build

cd /tmp/build

git config --global user.email "ndorfin+build-bot@gmail.com"
git config --global user.name "BuildBot"

git add .
git commit -m "Automated Rebuild [ci skip]"
git push -f origin gh-pages
