# Use a Java JDK base image
FROM eclipse-temurin:17-jdk

# Set the working directory
WORKDIR /app

# Copy the application JAR file
COPY target/eSkolskaKomunikacija-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run both Cloud SQL Proxy and the Spring Boot application
ENTRYPOINT ["java","-jar","/app.jar"]
