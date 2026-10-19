import java.io.File
import org.gradle.api.tasks.Delete
import org.gradle.api.tasks.Exec

plugins {
  base
}

val npmCommand = providers.gradleProperty("npmCommand")
  .orElse(providers.environmentVariable("NPM_COMMAND"))
  .orElse("npm")

fun Exec.useNpm(vararg arguments: String) {
  val executable = npmCommand.get()
  commandLine(executable, *arguments)

  // npm installed by nvm uses `/usr/bin/env node`; IDE-launched Gradle
  // processes commonly omit the nvm bin directory from PATH.
  val npmExecutable = File(executable)
  if (npmExecutable.isAbsolute) {
    environment(
      "PATH",
      listOf(npmExecutable.parent, System.getenv("PATH"))
        .filterNotNull()
        .filter(String::isNotBlank)
        .joinToString(File.pathSeparator),
    )
  }
}

tasks.named<Delete>("clean") {
  description = "Removes Gradle and npm build outputs."
  delete(layout.projectDirectory.dir("dist"))
}

val npmBuild by tasks.registering(Exec::class) {
  group = "build"
  description = "Builds the npm package."
  useNpm("run", "build")
}

tasks.named("build") {
  group = "build"
  description = "Builds the npm package."
  dependsOn(npmBuild)
}

tasks.register<Exec>("publish") {
  group = "publishing"
  description = "Publishes the npm package to its configured registry."
  dependsOn(npmBuild)
  useNpm("publish")
}
