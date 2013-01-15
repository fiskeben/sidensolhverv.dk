require 'rake/testtask'
require 'single_test'
SingleTest.load_tasks

desc "Test everything"
Rake::TestTask.new do |t|
  t.libs << 'test'
  t.test_files = FileList['test/*test.rb']
  t.verbose = true
end