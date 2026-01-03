#!/bin/bash

echo "========================================="
echo "MySQL Setup for College Portal"
echo "========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << 'EOF'
PORT=3000
NODE_ENV=development
JWT_SECRET=unified-college-portal-secret-key-2024-change-in-production

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=college_portal
EOF
    echo "✅ .env file created"
    echo ""
fi

# Check if MySQL password is set in .env
DB_PASSWORD=$(grep "^DB_PASSWORD=" .env | cut -d'=' -f2)

if [ -z "$DB_PASSWORD" ]; then
    echo "⚠️  MySQL root password is not set in .env file"
    echo ""
    echo "Please enter your MySQL root password:"
    read -s MYSQL_PASSWORD
    
    if [ -z "$MYSQL_PASSWORD" ]; then
        echo ""
        echo "No password entered. Attempting to connect without password..."
        MYSQL_PASSWORD=""
    else
        # Update .env with password
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/^DB_PASSWORD=$/DB_PASSWORD=$MYSQL_PASSWORD/" .env
        else
            # Linux
            sed -i "s/^DB_PASSWORD=$/DB_PASSWORD=$MYSQL_PASSWORD/" .env
        fi
        echo "✅ Password saved to .env file"
    fi
    echo ""
else
    echo "✅ MySQL password found in .env file"
    MYSQL_PASSWORD="$DB_PASSWORD"
    echo ""
fi

# Test MySQL connection
echo "Testing MySQL connection..."
if mysql -u root -p"$MYSQL_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ MySQL connection successful!"
    echo ""
    
    # Run migration
    echo "Running database migration..."
    npm run migrate
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "========================================="
        echo "✅ MySQL setup completed successfully!"
        echo "========================================="
        echo ""
        echo "Database: college_portal"
        echo "Tables: users, contacts"
        echo ""
        echo "You can now start the server with: npm run dev"
    else
        echo ""
        echo "❌ Migration failed. Please check the error above."
        exit 1
    fi
else
    echo "❌ MySQL connection failed!"
    echo ""
    echo "Possible solutions:"
    echo "1. Make sure MySQL is running: brew services start mysql"
    echo "2. Check your MySQL root password"
    echo "3. If you forgot your password, you may need to reset it:"
    echo "   https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html"
    echo ""
    echo "To set the password manually, edit Backend/.env and set DB_PASSWORD"
    exit 1
fi

